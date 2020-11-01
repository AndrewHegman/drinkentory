import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { SearchParams } from "../../Utils/Constants";
import { fetchAllBeer } from "../../Redux/Store/Beer/Actions";
import { useDispatch, connect } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { Beer } from "../../Interfaces/Beer.types";

export interface IAddNewItemModal {}

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.beer.isLoading,
    beer: state.beer.inventory,
  };
};

export const AddNewItemComponent: React.FC<IAddNewItemModal & { isLoading: boolean; beer: Beer[] }> = (props) => {
  const [beers, setBeers] = React.useState<string[]>([]);
  const { inventoryRoute, createNewItemRoute } = routes;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAllBeer());
  }, [dispatch]);

  React.useEffect(() => {
    if (!props.isLoading) {
      console.log(props);
      setBeers(props.beer.map((beer) => beer._id));
    }
  }, [props]);

  return (
    <BasePageWithSearchBar
      title="Choose a Beer"
      items={beers}
      pathname={inventoryRoute.pathname}
      notFoundRoute={{
        pathname: createNewItemRoute.pathname,
      }}
    />
  );
};

export const AddNewItem = connect(mapStateToProps)(AddNewItemComponent);
