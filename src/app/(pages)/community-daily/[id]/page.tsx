const DailyDeatailPage = ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  return (
    <>
      <div>아이디 값: {params.id}</div>
    </>
  );
};

export default DailyDeatailPage;
