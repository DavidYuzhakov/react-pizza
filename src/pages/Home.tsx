import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/slices/filter/selectors";
import { setCategoryId, setFilters } from "../redux/slices/filter/slice";
import { selectPizzaData } from "../redux/slices/pizza/selectors";
import { PizzaItem } from "../redux/slices/pizza/types";
import { fetchPizzas } from "../redux/slices/pizza/slice";

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from "../components";
import { list } from "../components/Sort";

export function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation()

  const isSearch = useRef(false); // не отправлять запрос 2 раза, если True то отправлять, когда в url ничего нет
  const isMounted = useRef(false); // на 2 рендер выполнять дейстивие

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, pageCount } = useSelector(selectFilter);
  const { searchValue } = useSelector(selectFilter);


  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  function fetchData() {
    const sortUrl = sort.sortProperty.replace("-", "");
    const orderUrl = sort.sortProperty.includes("-") ? "ask" : "desc";
    const categoryUrl = categoryId > 0 ? `category=${categoryId}` : "";
    const searchUrl = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortUrl,
        orderUrl,
        categoryUrl,
        pageCount,
        searchUrl,
      })
    );
  }
 

  useEffect(() => {
    interface IParams {
      searchValue: string;
      categoryId: number;
      pageCount: number;
      sortProperty: string;
    }

    if (location.search) { // for BrowserRouter you can use window.location.search
      // если в url что то есть, то будем парсить
      const params = qs.parse(
        location.search.substring(1)
      ) as unknown as IParams;
        
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          sort: sort || list[0],
          searchValue: params.searchValue,
          categoryId: params.categoryId,
          pageCount: params.pageCount,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchData();
    }

    isSearch.current = false;
  }, [categoryId, pageCount, searchValue, sort.sortProperty]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        pageCount,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, pageCount, sort]);

  const pizzas = items.map((val: PizzaItem) => (
    <PizzaBlock key={val.id} {...val} />
  ));
  const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort sort={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕 </h2>
          <p>
            Не удалось получить пиццы. <br />
            Повторите попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination />
    </div>
  );
}
