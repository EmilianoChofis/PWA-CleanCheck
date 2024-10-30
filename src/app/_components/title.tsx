const Title = ({ title }: { title: string }) => {
  return (
    <h1 className="text-xl font-[family-name:var(--font-jost-medium)] text-primary">
      {title}
    </h1>
  );
};

export default Title;
