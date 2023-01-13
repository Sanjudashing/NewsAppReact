import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  // articles = [
  //   {
  //     source: {
  //       id: "bbc-news",
  //       name: "BBC News",
  //     },
  //     author: "BBC News",
  //     title:
  //       "Iran protests: Jailed activist Sepideh Qolian describes brutality in letter",
  //     description:
  //       "Sepideh Qolian tells how confessions are extracted from detainees, in a rare letter from Evin prison.",
  //     url: "http://www.bbc.co.uk/news/world-middle-east-64225902",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/branded_news/2D5F/production/_128251611_sepideh.jpg",
  //     publishedAt: "2023-01-11T06:52:22.3238385Z",
  //     content:
  //       "One of Iran's most prominent female activists has described how confessions are forced out of prisoners, in a letter written inside a notorious jail.\r\nSepideh Qolian has been serving a five-year sent… [+4762 chars]",
  //   },
  //   {
  //     source: {
  //       id: "bbc-news",
  //       name: "BBC News",
  //     },
  //     author: "BBC News",
  //     title:
  //       "Prince Harry condemns 'dangerous spin' about his Taliban comments",
  //     description:
  //       'Responding for the first time to coverage of his book, the prince accuses some in the press of "lies".',
  //     url: "http://www.bbc.co.uk/news/uk-64231560",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/branded_news/10DC5/production/_128216096_gettyimages-159839382-1.jpg",
  //     publishedAt: "2023-01-11T05:22:20.6049956Z",
  //     content:
  //       'Prince Harry has said claims he boasted in his new book about killing 25 Taliban fighters while on duty in Afghanistan are a "dangerous lie".\r\nThe prince has been criticised for discussing killings i… [+3260 chars]',
  //   },
  //   {
  //     source: {
  //       id: "bbc-news",
  //       name: "BBC News",
  //     },
  //     author: "BBC News",
  //     title: "The 11-year-old piano prodigy with Mozart-level talent",
  //     description:
  //       "Jude's talent caught the attention of a piano tuner who surprised him with an amazing gift.",
  //     url: "http://www.bbc.co.uk/news/world-us-canada-64227618",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/branded_news/8511/production/_128256043_p0dvg7m6.jpg",
  //     publishedAt: "2023-01-11T04:07:17.3865183Z",
  //     content:
  //       "Up Next. Watch: Video shows fighting in Soledar, Ukraine. Video, 00:00:46Watch: Video shows fighting in Soledar, Ukraine",
  //   },
  //   {
  //     source: {
  //       id: "bbc-news",
  //       name: "BBC News",
  //     },
  //     author: "BBC News",
  //     title: "Bolsonaro fans flock to ex-president's Florida hideout",
  //     description:
  //       "Brazil's ex-president, who has been seen eating at KFC, has many supporters among the US diaspora.",
  //     url: "http://www.bbc.co.uk/news/world-latin-america-64231244",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/branded_news/9ED9/production/_128256604_gettyimages-1246122885.jpg",
  //     publishedAt: "2023-01-11T03:52:19.3549755Z",
  //     content:
  //       "The gated community of Encore Resort in Kissimmee, Florida, is filled with rows of clean-cut grey homes and palm trees.\r\nNormally a placid place, it has been anything but quiet the last few weeks.\r\nS… [+4781 chars]",
  //   },
  //   {
  //     source: {
  //       id: "bbc-news",
  //       name: "BBC News",
  //     },
  //     author: "BBC News",
  //     title: "This is the carnage storms have inflicted on California",
  //     description:
  //       'A deadly "parade of storms" have battered the state, causing millions in damage, with more on the way.',
  //     url: "http://www.bbc.co.uk/news/world-us-canada-64231624",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/branded_news/17FE3/production/_128257289_gettyimages-1246134883.jpg",
  //     publishedAt: "2023-01-11T03:22:21.2624672Z",
  //     content:
  //       "Multi-million dollar beach homes battered by winds, cars swallowed up by sinkholes, and over a dozen people killed - after weeks of extreme storms, California is at a breaking point. \r\nThe state's fa… [+2605 chars]",
  //   },
  //   {
  //     source: {
  //       id: "bbc-news",
  //       name: "BBC News",
  //     },
  //     author: "BBC News",
  //     title: "Golden Globes 2023: Ceremony under way in Los Angeles",
  //     description:
  //       "The awards ceremony is back this year, but the body behind it remains controversial in Hollywood.",
  //     url: "http://www.bbc.co.uk/news/entertainment-arts-64226565",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/branded_news/12FCF/production/_128257777_crettyimages-1455611441.jpg",
  //     publishedAt: "2023-01-11T02:22:21.6674943Z",
  //     content:
  //       "The Golden Globe Awards 2023 are under way in Los Angeles, as the ceremony mounts a comeback following two years of controversy.\r\nNominees including Michelle Yeoh and Eddie Redmayne are in attendance… [+4552 chars]",
  //   },
  //   {
  //     source: {
  //       id: "bbc-news",
  //       name: "BBC News",
  //     },
  //     author: "BBC News",
  //     title: "Cardinal George Pell dies aged 81",
  //     description:
  //       "The cleric's convictions on child abuse charges - since quashed on appeal - shocked the Catholic Church.",
  //     url: "http://www.bbc.co.uk/news/world-australia-64231261",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/branded_news/18E7/production/_128257360_gettyimages-953254460.jpg",
  //     publishedAt: "2023-01-11T00:37:20.964305Z",
  //     content:
  //       "Cardinal George Pell, whose conviction on child abuse charges shocked the Catholic Church before being quashed, has died at 81.\r\nThe former Vatican treasurer is Australia's highest ranking Catholic c… [+1068 chars]",
  //   },
  //   {
  //     source: {
  //       id: "bbc-news",
  //       name: "BBC News",
  //     },
  //     author: "BBC News",
  //     title: "Classified files found at Biden's former private office",
  //     description:
  //       "The FBI is reportedly involved after documents were found at an office he used before his presidency.",
  //     url: "http://www.bbc.co.uk/news/world-us-canada-64218179",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/branded_news/D1A1/production/_128256635_gettyimages-1246049551.jpg",
  //     publishedAt: "2023-01-11T00:07:18.7936743Z",
  //     content:
  //       "The US justice department is reviewing documents marked classified found in President Joe Biden's former office at a think tank, the White House says.\r\nAbout 10 of the files were discovered in a lock… [+4243 chars]",
  //   },
  //   {
  //     source: {
  //       id: "bbc-news",
  //       name: "BBC News",
  //     },
  //     author: "BBC News",
  //     title: "Girl finds rare megalodon shark tooth on Christmas",
  //     description:
  //       "Molly Sampson went beachcombing for a fossil from the largest macropredator ever to exist. That's what she found.",
  //     url: "http://www.bbc.co.uk/news/world-us-canada-64231245",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/branded_news/B077/production/_128257154_324554302_901858874192663_5109768519388067727_n.jpg",
  //     publishedAt: "2023-01-10T22:52:17.714594Z",
  //     content:
  //       "Amateur fossil hunters dream of finding the ancient and the rare. One little girl spoke it into existence.\r\nMolly Sampson, nine, was on a Christmas Day visit to Calvert Beach in Maryland, and told he… [+1979 chars]",
  //   },
  //   {
  //     source: {
  //       id: "bbc-news",
  //       name: "BBC News",
  //     },
  //     author: "BBC News",
  //     title: "Brazil riots: Former public security chief accused of 'sabotage'",
  //     description:
  //       "Brasília's former public security chief was blamed for leaving local forces without leadership.",
  //     url: "http://www.bbc.co.uk/news/world-latin-america-64228530",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/branded_news/6A09/production/_128254172_fafc37ee5c9030442eae6b79e71a3af03dc1969f0_300_3746_21071000x563.jpg",
  //     publishedAt: "2023-01-10T21:52:24.2762857Z",
  //     content:
  //       'Media caption, Watch: Key moments as Bolsonaro supporters storm Brazil government buildings\r\nBrasília\'s former public security chief has been accused of "sabotaging" local police forces and failing t… [+4655 chars]',
  //   },
  // ];

  const functionApi = async (page) => {
    console.log("functionApi");
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&from=2023-01-11&to=2023-01-11&apiKey=2c77b412636b4a6e8b638451ca62e8bd&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    setLoading(true);
    let data = await fetch(url);

    let parseData = await data.json();
    setArticles(parseData.articles);
    settotalResults(parseData.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    functionApi(1);
  }, []);

  // const componentDidMount = async () => {
  //   // let url = `https://newsapi.org/v2/everything?q=cricket%20india&from=2023-01-11&to=2023-01-11&apiKey=14186a6fdaef4a8fae6a138589b00b14 &page=1pageSize=${props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parseData = await data.json();
  //   // console.log(parseData);
  //   // this.setState({
  //   //   articles: parseData.articles,
  //   //   totalResults: parseData.totalResults,
  //   // });
  //   this.functionApi(1);

  //   // console.log(data);
  // };

  const handlePreClick = async () => {
    // let url = `https://newsapi.org/v2/everything?q=cricket%20india&from=2023-01-11&to=2023-01-11&apiKey=14186a6fdaef4a8fae6a138589b00b14 &page=${
    //   this.state.page - 1
    // }pageSize=${props.pageSize}`;
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({ articles: parseData.articles });
    functionApi(page - 1);
    setPage(page - 1);
    // this.setState({
    //   page: page - 1,
    //   // articles: parseData.articles,
    // });
  };
  const handleNextClick = async () => {
    console.log("next");
    if (page + 1 > Math.ceil(totalResults / 20)) {
      console.log("handleNextClick");
    } else {
      functionApi(page + 1);
      setPage(page + 1);
      // let url = `https://newsapi.org/v2/everything?q=cricket%20india&from=2023-01-11&to=2023-01-11&apiKey=14186a6fdaef4a8fae6a138589b00b14 &page=${
      //   this.state.page + 1
      // }&pageSize=${props.pageSize}`;
      // let data = await fetch(url);
      // let parseData = await data.json();
      // console.log(parseData);
      // this.setState({
      //   page: page + 1,

      //   // articles: parseData.articles,
      // });
    }
  };

  let myStyle = {
    margin: "35px 0px",
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={myStyle}>
        News-Top {props.category} Headlines
      </h1>
      {loading && <Spinner />}
      <div className="row">
        {!loading &&
          articles?.map((element) => {
            console.log(element);
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={handlePreClick}
        >
          &larr;Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          &rarr;Next
        </button>
      </div>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
