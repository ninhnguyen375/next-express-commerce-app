import React, { Component } from 'react';
import { Fab } from '@material-ui/core';
import {
  ChevronLeft,
  LastPage,
  FirstPage,
  ChevronRight
} from '@material-ui/icons';

class Pagination extends Component {
  componentDidMount() {}

  render() {
    const { currPage, lastPage, handleChangePage } = this.props;

    return (
      <div>
        {currPage > 1 && (
          <>
            <a href="#content" key="firstPage">
              <Fab
                onClick={handleChangePage(1)}
                size="small"
                style={{ margin: 5 }}
              >
                <FirstPage />
              </Fab>
            </a>
            <a key="prevPage" href="#content">
              <Fab
                onClick={handleChangePage(currPage - 1)}
                size="small"
                style={{ margin: 5 }}
                color={'default'}
              >
                <ChevronLeft />
              </Fab>
            </a>
          </>
        )}

        {currPage > 2 && (
          <Fab
            key={'hiddenPageLeft'}
            size="small"
            title={`1 - ${currPage - 2}`}
            style={{ margin: 5, boxShadow: 'none' }}
          >
            {'...'}
          </Fab>
        )}

        {[currPage - 1, currPage, currPage + 1].map(item => {
          if (item > 0 && item <= lastPage) {
            return (
              <a href={'#content'} key={item}>
                <Fab
                  onClick={handleChangePage(item)}
                  size="small"
                  style={{ margin: 5, boxShadow: 'none' }}
                  color={currPage === item ? 'primary' : 'default'}
                >
                  {item}
                </Fab>
              </a>
            );
          }
        })}

        {currPage + 1 < lastPage && (
          <Fab
            key={'hiddenPageRight'}
            title={`${currPage + 2} - ${lastPage}`}
            size="small"
            style={{ margin: 5, boxShadow: 'none' }}
          >
            {'...'}
          </Fab>
        )}

        {currPage < lastPage && (
          <>
            <a href="#content" key="nextPage">
              <Fab
                onClick={handleChangePage(currPage + 1)}
                size="small"
                style={{ margin: 5 }}
              >
                <ChevronRight />
              </Fab>
            </a>
            <a href="#content" key="lastPage">
              <Fab
                onClick={handleChangePage(lastPage)}
                size="small"
                style={{ margin: 5 }}
              >
                <LastPage />
              </Fab>
            </a>
          </>
        )}
      </div>
    );
  }
}

export default Pagination;
