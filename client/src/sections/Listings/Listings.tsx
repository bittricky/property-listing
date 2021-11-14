import { FC } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Listings as ListingsData } from "./__generated__/Listings";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from "./__generated__/DeleteListing";

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings: FC<Props> = ({ title }) => {
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListings,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListings = async (id: string) => {
    await deleteListings({ variables: { id } });
    refetch();
  };

  const listings = data ? data?.listings : null;

  const list = listings ? (
    <ul>
      {listings?.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => handleDeleteListings(listing.id as string)}>
              Delete a Listings!
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Something went wrong - please try again</h2>;
  }

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deleting...</h4>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>Something went wrong - please try again</h4>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {list}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};

Listings.displayName = "Listings";
