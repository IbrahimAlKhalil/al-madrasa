import {
  RecentArticle,
  RecentArticleInterface,
} from 'c/articles/recent-article';
import { Tag, TagInterface } from 'c/articles/tag';
import { CategoryInterface } from 'c/category';
import React, { FunctionComponent } from 'react';
import { Categories } from 'c/categories';
import { Search } from 'c/search';

export const Sidebar: FunctionComponent<SidebarInterface> = (props) => {
  return (
    <div className="sidebar">
      <Search keyword={props.keyword} action={props.action} />

      {props.categories.length > 0 && (
        <Categories categories={props.categories} />
      )}

      {props.recent.length > 0 && (
        <React.Fragment>
          <h3 className="sidebar-title">সাম্প্রতিক প্রবন্ধ সমূহ</h3>
          <div className="sidebar-item recent-posts">
            {props.recent.map((r) => (
              <RecentArticle key={r.id} {...r} />
            ))}
          </div>
        </React.Fragment>
      )}

      {props.tags.length > 0 && (
        <React.Fragment>
          <h3 className="sidebar-title">ট্যগ সমূহ</h3>
          <div className="sidebar-item tags">
            <ul>
              {props.tags.map((t) => (
                <Tag key={t.id} {...t} />
              ))}
            </ul>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export interface SidebarInterface {
  action?: string;
  keyword?: string;
  categories: CategoryInterface[];
  tags: TagInterface[];
  recent: RecentArticleInterface[];
}
