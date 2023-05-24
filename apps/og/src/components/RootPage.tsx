export default function RootPage() {
  return (
    <div
      tw="h-full w-full flex justify-center items-center p-20"
      style={{ backgroundColor: "#DE4500", color: "#FBF4EF" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        tw="rounded-full w-64"
        src="https://og.learnwitheunjae.dev/profile.jpg"
        alt="Eunjae Lee"
      />
      <div tw="ml-16 mr-16 flex flex-col">
        <p style={{ fontSize: "50px", lineHeight: 0.6 }}>Learn with</p>
        <p style={{ fontSize: "80px", lineHeight: 0.6 }}>Eunjae</p>
      </div>
    </div>
  );
}
