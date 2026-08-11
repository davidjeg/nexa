interface Props {
  children: React.ReactNode;
}
function Wrapper({ children }: Props) {
  return <div className="px-4 ">{children}</div>;
}

export default Wrapper;
