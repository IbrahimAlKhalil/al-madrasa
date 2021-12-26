import {RecentArticle, RecentArticleInterface} from 'c/articles/recent-article';
import {Category, CategoryInterface} from 'c/articles/category';
import {FormEvent, FunctionComponent, useState} from 'react';
import {Tag, TagInterface} from 'c/articles/tag';

export const Sidebar: FunctionComponent<SidebarInterface> = (props) => {
    const [keyword, updateKeyword] = useState(props.keyword);
    const intl = new Intl.NumberFormat('bn-BD');

    function handleSearchInput(evt: FormEvent<HTMLInputElement>) {
        updateKeyword(evt.currentTarget.value);
    }

    return (
        <div className="sidebar">
            <h3 className="sidebar-title">অনুসন্ধান</h3>
            <div className="sidebar-item search-form">
                <form action={props.action ?? ''} method="get">
                    <input type="text" name="q" value={keyword} onInput={handleSearchInput}/>
                    <button type="submit">
                        <i className="mi">search</i>
                    </button>
                </form>
            </div>

            <h3 className="sidebar-title">ক্যটাগরি সমূহ</h3>
            <div className="sidebar-item categories">
                <ul>
                    {
                        props.categories.map(
                            c => <Category
                                count={intl.format(Number(c.count))}
                                name={c.name}
                                key={c.id}
                                id={c.id}/>
                        )
                    }
                </ul>
            </div>

            <h3 className="sidebar-title">সাম্প্রতিক প্রবন্ধ সমূহ</h3>
            <div className="sidebar-item recent-posts">
                {
                    props.recent.map(r => <RecentArticle key={r.id} {...r} />)
                }
            </div>

            <h3 className="sidebar-title">ট্যগ সমূহ</h3>
            <div className="sidebar-item tags">
                <ul>
                    {
                        props.tags.map(t => <Tag key={t.id} {...t}/>)
                    }
                </ul>
            </div>
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
