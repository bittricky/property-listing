import React, { FC, useState, useEffect } from "react";
import { server } from "../../lib/api";
import {
  DeleteListingData,
  DeleteListingVariables,
  Listing,
  ListingsData,
} from "./types";

const LISTINGS = `
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

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings: FC<Props> = ({ title, children }) => {
  const [listings, setListings] = useState<Listing[] | null>(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({
      query: LISTINGS,
    });

    setListings(data.listings);
  };

  const deleteListings = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    });
    fetchListings();
  };

  const list = listings ? (
    <ul>
      {listings?.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => deleteListings(listing.id)}>
              Delete a Listings!
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  return (
    <div>
      {list}
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings!</button>
    </div>
  );
};

Listings.displayName = "Listings";