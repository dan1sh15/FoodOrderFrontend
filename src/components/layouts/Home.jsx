import React, { useEffect } from 'react'
import CountRestaurant from './CountRestaurant'
import Restaurant from './Restaurant'
import { getRestaurants, sortByRatings, sortByReviews, toggleVegOnly } from '../../actions/restaurantActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';

const Home = () => {
    const dispatch = useDispatch();

    const { loading: restaurantsLoading, error: restaurantsError, restaurants, showVegOnly } = useSelector((state) => state.restaurants);
    
    useEffect(() => {
        dispatch(getRestaurants());
    }, [dispatch]);

    const handleSortByReview = () => {
        dispatch(sortByReviews());
    };

    const handleSortByRating = () => {
        dispatch(sortByRatings());
    }

    const handleToggleVegOnly = () => {
        dispatch(toggleVegOnly());
    }

  return (
    <>
        <CountRestaurant />

        {
            restaurantsLoading ? (<Loader />) : restaurantsError ? <Message variant={"danger"}>{restaurantsError}</Message> : (
                <section>
                    <div className="sort">
                        <button onClick={handleToggleVegOnly} className="sort_veg p-3">
                            {
                                showVegOnly ? "Show All" : "Pure Veg"
                            }
                        </button>
                        <button onClick={handleSortByReview} className="sort_rev p-3">Sort By Review</button>
                        <button onClick={handleSortByRating} className="sort_rate p-3">Sort By Ratings</button>
                    </div>

                    <div className="row mt-4">
                        {
                            restaurants ? restaurants.map((restaurant) => 
                            !showVegOnly || (showVegOnly && restaurant.isVeg) ? (
                                <Restaurant key={restaurant._id} restaurant={restaurant} />
                            ): null) : (<Message variant={"info"}>No Restaurant Found</Message>)
                        }
                    </div>
                </section>
            )
        }
    </>
  )
}

export default Home
