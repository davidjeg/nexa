interface Props {
  children: React.ReactNode;
}
function Container({ children }: Props) {
  return <div className="max-w-7xl mx-auto w-full">{children}</div>;
}

export default Container;
