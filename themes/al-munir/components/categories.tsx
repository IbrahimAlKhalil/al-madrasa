import {Category, CategoryInterface} from 'c/category';
import {FunctionComponent} from 'react';

interface CategoriesInterface {
    categories: CategoryInterface[];
}

export const Categories: FunctionComponent<CategoriesInterface> = (props) => {
    const intl = new Intl.NumberFormat('bn-BD');

    return (
        <>
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
        </>
    )
}
