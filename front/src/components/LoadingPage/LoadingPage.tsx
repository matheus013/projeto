interface LoadingPagePropsType {
  open: boolean;
  isInPanel: boolean;
}

const LoadingPage = ({ isInPanel }: LoadingPagePropsType) => {
  if (isInPanel) {
    return (
      <div className="loading-page">
        <img src="/images/10.png" alt="" />
      </div>
    );
  } else {
    return (
      <div className="loading-page-2">
        <img src="/images/10.png" alt="" />
      </div>
    );
  }

  return <div></div>
};

export default LoadingPage;
