export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <div className="absolute lg:hidden md:hidden top-0 right-0 w-[500px] h-[200px] bg-gradient-to-r from-red-500 to-yellow-400 rounded-b-full"></div>
        {children}
      </>
    );
  }

  