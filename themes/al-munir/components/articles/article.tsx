import { RecentArticleInterface } from 'c/articles/recent-article';
import { FunctionComponent } from 'react';
import Link from 'next/link';

export interface ArticleInterface extends RecentArticleInterface {
  commentCount: number;
  content: string;
  excerpt: string;
  user_created: {
    first_name: string;
    last_name: string;
    avatar: string;
    description: string;
  };
}

export const Article: FunctionComponent<ArticleInterface> = (props) => {
  return (
    <div className="col-lg-4">
      <div className="post-box">
        <div className="post-img">
          <img
            src={`/assets/${props.featured_image}`}
            className="img-fluid"
            alt={props.title}
          />
        </div>

        <span className="post-date">{props.date_created}</span>

        <h3 className="post-title">{props.title}</h3>

        <div dangerouslySetInnerHTML={{ __html: props.excerpt }} />

        <Link href={`/articles/${props.id}`}>
          <a className="readmore stretched-link mt-auto">
            <span>আরও পড়ুন</span>
            <i className="mi">arrow_right</i>
          </a>
        </Link>
      </div>
    </div>
  );
};
