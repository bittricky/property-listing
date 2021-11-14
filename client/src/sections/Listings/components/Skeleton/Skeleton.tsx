import { FC } from "react";
import { Alert, Skeleton, Divider } from "antd";
import "./Skeleton.css";

interface Props {
  title: string;
  error?: boolean;
}

export const ListingsSkeleton: FC<Props> = ({
  title,
  error = false,
}: Props) => {
  const errorAlert = error ? (
    <Alert type="error" message="Something went wrong - please try again" />
  ) : null;

  return (
    <div className="listings-skeleton">
      {errorAlert}
      <h2>{title}</h2>
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
    </div>
  );
};
