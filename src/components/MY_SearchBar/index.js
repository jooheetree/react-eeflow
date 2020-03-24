import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import Search from './Search';
import Filter from './Filter';
import CustomDate from "../CustomDate";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    flexGrow: 1,
    maxWidth: 480,
    flexBasis: 480
  },
  filterButton: {
    marginLeft: 'auto'
  },
  filterIcon: {
    marginRight: theme.spacing(1)
  }
}));

function MY_SearchBar({
  onFilter, onSearch, className,
  dateValues, setDateValues, searchContent, setSearchContent, ...rest
}) {
  const classes = useStyles();
  const [openFilter, setOpenFilter] = useState(false);

  const handleFilterOpen = () => {
    setOpenFilter(true);
  };

  const handleFilterClose = () => {
    setOpenFilter(false);
  };

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid item xs={12} md={4}>
        <CustomDate values={dateValues} setValues={setDateValues} />
      </Grid>
      <Grid item xs={12} md={4}>
        <Search
          searchContent={searchContent}
          setSearchContent={setSearchContent}
          className={classes.search}
          onSearch={onSearch}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Button
          className={classes.filterButton}
          color="primary"
          onClick={handleFilterOpen}
          size="small"
          variant="outlined"
        >
          <FilterListIcon className={classes.filterIcon} />
          {' '}
          Show filters
        </Button>
      </Grid>
      <Filter
        onClose={handleFilterClose}
        onFilter={onFilter}
        open={openFilter}
      />
    </Grid>
  );
}

MY_SearchBar.propTypes = {
  className: PropTypes.string,
  onFilter: PropTypes.func,
  onSearch: PropTypes.func,
  dateValues: PropTypes.object,
  setDateValues: PropTypes.func,
  searchContent: PropTypes.string,
  setSearchContent: PropTypes.func
};

export default MY_SearchBar;
