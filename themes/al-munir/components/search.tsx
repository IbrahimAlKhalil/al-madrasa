import { FormEvent, FunctionComponent, useState } from 'react';

interface SearchInterface {
  keyword?: string;
  action?: string;
}

export const Search: FunctionComponent<SearchInterface> = (props) => {
  const [keyword, updateKeyword] = useState(props.keyword);

  function handleSearchInput(evt: FormEvent<HTMLInputElement>) {
    updateKeyword(evt.currentTarget.value);
  }

  return (
    <>
      <h3 className="sidebar-title">অনুসন্ধান</h3>
      <div className="sidebar-item search-form">
        <form action={props.action ?? ''} method="get">
          <input
            type="text"
            name="q"
            value={keyword}
            onInput={handleSearchInput}
          />
          <button type="submit">
            <i className="mi">search</i>
          </button>
        </form>
      </div>
    </>
  );
};
