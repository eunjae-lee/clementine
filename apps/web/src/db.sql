-- accounts
create table accounts (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  created_ts TIMESTAMP WITH TIME ZONE not null default now(),
  updated_ts TIMESTAMP WITH TIME ZONE
);
alter table accounts enable row level security;
create policy "Can view own account." on accounts for select using (auth.uid() = user_id);

create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.accounts (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.tidy_account_before_update()
returns trigger as $$
begin
  new.updated_ts = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger on_deck_before_update
  before update on public.accounts
  for each row execute procedure public.tidy_account_before_update();
