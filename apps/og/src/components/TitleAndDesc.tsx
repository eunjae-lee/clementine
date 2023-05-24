export default function TitleAndDesc({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      tw="h-full w-full flex justify-center items-center p-20"
      style={{ backgroundColor: "#DE4500", color: "#FBF4EF" }}
    >
      <div tw="flex flex-col items-center w-1/3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          tw="rounded-full w-64"
          src="https://og.learnwitheunjae.dev/profile.jpg"
          alt="Eunjae Lee"
        />
      </div>
      <div tw="w-2/3 flex flex-col">
        <p tw="" style={{ fontSize: "70px" }}>
          {title}
        </p>
        <p
          style={{
            fontSize: "30px",
            opacity: 0.75,
          }}
        >
          {description}
        </p>
        <p
          style={{
            width: "100%",
            textAlign: "right",
            opacity: 0.9,
            fontSize: "25px",
            lineHeight: 0.3,
          }}
        >
          Learn with Eunjae
        </p>
      </div>
    </div>
  );
}
