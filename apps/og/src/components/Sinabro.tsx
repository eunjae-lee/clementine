export default function Sinabro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      tw="h-full w-full flex p-20"
      style={{ backgroundColor: "#DE4500", color: "#FBF4EF" }}
    >
      <div tw="flex flex-col w-3/4 h-full relative">
        <p tw="mb-8" style={{ fontSize: "60px" }}>
          {title}
        </p>
        {description
          .replaceAll("<br />", "<br/>")
          .split("<br/>")
          .map((line, index) => (
            <p
              key={index}
              style={{
                margin: 0,
                fontSize: "40px",
                opacity: 0.9,
              }}
            >
              {line}
            </p>
          ))}

        <div
          tw="mt-8 absolute bottom-0"
          style={{
            width: "100%",
            textAlign: "right",
            opacity: 0.6,
            fontSize: "32px",
            lineHeight: 0.3,
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FBF4EF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="13.5" cy="6.5" r=".5"></circle>
            <circle cx="17.5" cy="10.5" r=".5"></circle>
            <circle cx="8.5" cy="7.5" r=".5"></circle>
            <circle cx="6.5" cy="12.5" r=".5"></circle>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
          </svg>
          <span tw="ml-2">시나브로 자바스크립트</span>
        </div>
      </div>
      <div tw="flex flex-col w-1/4 h-full justify-end items-end">
        <img
          tw="rounded-full w-48"
          src="https://og.learnwitheunjae.dev/profile.jpg"
          alt="Eunjae Lee"
        />
      </div>
    </div>
  );
}
