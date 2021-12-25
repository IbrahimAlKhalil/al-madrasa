import {RecentArticleInterface} from 'c/articles/recent-article';
import {FunctionComponent} from 'react';
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
    const intl = new Intl.NumberFormat('bn-BD');

    return (
        <article className="entry">
            <div className="entry-img">
                <img src={`/assets/${props.featured_image}`} alt={props.title} className="img-fluid"/>
            </div>

            <h2 className="entry-title">
                <Link href={`/articles/${props.id.toString()}`}>{props.title}</Link>
            </h2>

            <div className="entry-meta">
                <ul>
                    <li className="d-flex align-items-center">
                        <i className="mi">person</i>
                        <a>{props.user_created.first_name} {props.user_created.last_name}</a>
                    </li>
                    <li className="d-flex align-items-center">
                        <i className="mi">access_time</i>
                        <a>
                            {/* TODO: add datetime attribute */}
                            <time>{props.date_created}</time>
                        </a>
                    </li>
                    <li className="d-flex align-items-center">
                        <i className="mi">chat</i>
                        <Link href={`/articles/${props.id.toString()}#comments`}><a>{intl.format(props.commentCount)} টি
                            মন্তব্য</a></Link>
                    </li>
                </ul>
            </div>

            <div className="entry-content">
                <div dangerouslySetInnerHTML={{__html: props.excerpt}}/>
                <div className="read-more">
                    <Link href={`/articles/${props.id.toString()}`}>আরও পরুন</Link>
                </div>
            </div>
        </article>
    );
};
