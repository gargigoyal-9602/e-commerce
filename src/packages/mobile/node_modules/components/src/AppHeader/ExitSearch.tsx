import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { withRouter, Redirect } from 'react-router-dom';

// import commands from '../../commands';
// import langg from '../../language';
import './css/index.scoped.css';
const ItemWithRouter: any = withRouter((props: any) => {
  const selectingId = () => {
    if (props.query.attributes.type == "Catalogue") {
      return "id"
    }
    if (props.query.attributes.type == "SubCategory") {
      return "sub_category_id"
    }
    if (props.query.attributes.type == "Category") {
      return "category_id"
    }
  }

  return (
    <ListGroupItem
      {...props}

      onClick={() => {
        let query;
        props.hideSearch();
        //q[name]=Product 8&q[id]=60
        props.isQuickResults ? (
          localStorage.setItem("searchQuery", `&q[name]=${props.query.attributes.name}&q[${selectingId()}]=${props.query.attributes.id}`),
          query = props.query.attributes.name
        ) :
          (
            localStorage.setItem("searchQuery", `&q[name]=${props.query.name}`),
            query = props.query.name
          )

        const route = "../"
        //@ts-ignore                       
        props.history.location.pathname.split("/").join(",").length < 1 ?
          props.history.push(`./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[name]=${query}`) :
          props.history.push(`./${route.repeat(props.history.location.pathname.split("/").join(",").length - 1)}Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[name]=${query}`)




      }}
    />
  );
})

type MyProps = {
  testID: string,
  isMobile: boolean,
  isQuickResults: boolean,
  hideSearch: () => void,
  results: any
};

type MyState = {

};

class ExitSearch extends Component<MyProps, MyState>{
  constructor(props: any) {
    super(props);
  }

  render() {
    // const lang = new langg('header');
    return (
      <div className="yt-recent-search-wrap my-2">
        {this.props.isMobile && this.props.children}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <p className="recent-search-tag-name m-0">
            {this.props.isQuickResults
              ? "Quick Results"
              : "Recent Searches"}
          </p>
          <img
            src={require('./images/close-icn.png')}
            onClick={() => this.props.hideSearch()}
          />
        </div>
        <ListGroup className="recent-search-list-wrap" flush>
          {this.props.results.map((item: any, index: number) => {
            return (

              <ItemWithRouter
                hideSearch={this.props.hideSearch}
                className="px-0 w3-hover-opacity"
                style={{ cursor: 'default' }}
                query={item}
                isQuickResults={this.props.isQuickResults}
              >

                <div onClick={() => this.props.hideSearch()} >
                  {this.props.isQuickResults ? item.attributes.name : item.name}
                </div>
              </ItemWithRouter>

            );
          })}
        </ListGroup>
      </div>
    );
  }
}

//@ts-ignore
export default withRouter(ExitSearch);
