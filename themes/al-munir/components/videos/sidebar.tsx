import { CategoryInterface } from 'c/category';
import { FunctionComponent } from 'react';
import { Categories } from 'c/categories';
import { Search } from 'c/search';

export const Sidebar: FunctionComponent<SidebarInterface> = (props) => {
  return (
    <div className="sidebar">
      <Search keyword={props.keyword} action={props.action} />
      {props.categories.length > 0 && (
        <Categories categories={props.categories} />
      )}
    </div>
  );
};

export interface SidebarInterface {
  action?: string;
  keyword?: string;
  categories: CategoryInterface[];
}
