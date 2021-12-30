import { FunctionComponent } from 'react';
import Link from 'next/link';

export const RecentArticle: FunctionComponent<RecentArticleInterface> = (
  props,
) => {
  return (
    <div className="post-item clearfix">
      <img src={`/assets/${props.featured_image}`} alt={props.title} />
      <h4>
        <Link href={`/articles/${props.id}`}>{props.title}</Link>
      </h4>
      {/* TODO: add datetime attribute */}
      <time>{props.date_created}</time>
    </div>
  );
};

export interface RecentArticleInterface {
  id: number;
  title: string;
  featured_image: string;
  date_created: string;
}
