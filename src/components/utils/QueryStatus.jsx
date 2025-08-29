import CustomLoading from "./CustomLoading";
import QueryError from "./CustomError";

const QueryStatus = ({
  query,
  loadingText = "Loading...",
  data,
  emptyMessage = "No data available.",
  errorTitle = "Something went wrong",
  children,
}) => {
  if (query.isLoading) {
    return <CustomLoading text={loadingText} />;
  }

  if (query.isError) {
    return (
      <QueryError
        error={query.error}
        onRetry={query.refetch}
        title={errorTitle}
      />
    );
  }
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <div className="text-center py-12 text-gray-500">{emptyMessage}</div>
    );
  }

  return children;
};

export default QueryStatus;
