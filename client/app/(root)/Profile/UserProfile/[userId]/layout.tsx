export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex bg-red-300" >
        {children}
      </div>
    );
  }

