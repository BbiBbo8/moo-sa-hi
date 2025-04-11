const ShelterDeatailPage = ({
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

export default ShelterDeatailPage;
