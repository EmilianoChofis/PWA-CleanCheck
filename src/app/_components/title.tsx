const Title = ({ title, className }: { title: string; className: string }) => {
  return (
    <h1 className={`${className} font-[family-name:var(--font-jost-medium)]`}>
      {title}
    </h1>
  );
};

export default Title;
