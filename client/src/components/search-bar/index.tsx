import './styles.scss';

import React from 'react';

/**
 * @prop onChange - Callback triggered whenever the search bar value changes
 * @prop value - The current text value within the search bar
 */
interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

/** Styled search bar */
const SearchBar: React.FC<Props> = (props: Props) => (
  <input
    value={props.value}
    onChange={props.onChange}
    placeholder="Search"
    className="search-bar"
  />
);

export default SearchBar;
