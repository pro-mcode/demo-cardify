export default function DesktopBackground() {
  return (
    <div className="hidden lg:block absolute left-0 top-0 h-full w-[20rem]">
      <img
        src="assets/images/bg-main-desktop.png"
        alt="background"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
