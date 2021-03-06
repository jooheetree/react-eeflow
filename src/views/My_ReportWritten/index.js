import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Container} from '@material-ui/core';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router";
import axios from "../../utils/my_axios";
import Header from './Header';
import Results from './Results';
import moment from "moment";
import MY_SearchBar from "../../components/MY_SearchBar";
import {isloading} from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const initialValues = {
  name: '',
  startDate: moment().add(-3, 'month'),
  endDate: moment()
};


function ReportWritten() {
  const classes = useStyles();
  const [headerText, setHeaderText] = useState('상신함');
  const [documents, setDocuments] = useState([]);
  const [inputDateValues, setInputDateValues] = useState({...initialValues});
  const [inputSearchContent, setInputSearchContent] = useState('');
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSearchContent = (event) => {
    setInputSearchContent(event.target.value);
  };

  const handleSearch = (batchNumber, user, department) => {
    fetchDocuments(batchNumber, user, department);
  };

  const fetchDocuments = (batchNumber = '', user = '', department = '') => {
    let url = `ea/written_document/`;

    if (location.pathname === '/reportRejected') {
      url = `ea/rejected_document/`;
      setHeaderText('반려함');
    } else if (location.pathname === '/reportApproved') {
      url = `ea/approved_document/`;
      setHeaderText('기결함');
    }

    let params = {
      startDate: moment(inputDateValues.startDate).format('YYYY-MM-DD'),
      endDate: moment(inputDateValues.endDate).format('YYYY-MM-DD'),
      search: inputSearchContent
    }

    if (batchNumber) {
      params['batchNumber'] = batchNumber;
    }

    if (user) {
      params['user'] = user;
    }

    if (department) {
      params['department'] = department;
    }

    const config = {
      headers: {Authorization: `Token ${localStorage.getItem('token')}`},
      params: params
    };

    dispatch(isloading(true))
    axios.get(url, config)
      .then((response) => {
        setDocuments(response.data);
        dispatch(isloading(false))
      })
      .catch(error => dispatch(isloading(false)));
  };

  useEffect(() => {
    if (!(localStorage.getItem('token'))) {
      history.push('/auth/login');
    }
    fetchDocuments();
  }, [location.pathname]);

  return (
    <Page
      className={classes.root}
      title="상신함"
    >
      <Container maxWidth={false}>
        <Header headerText={headerText}/>
        <MY_SearchBar
          searchContent={inputSearchContent}
          setSearchContent={handleSearchContent}
          dateValues={inputDateValues}
          setDateValues={setInputDateValues}
          onSearch={handleSearch}
          detail
        />
        {documents && (
          <Results
            className={classes.results}
            documents={documents}
          />
        )}
      </Container>
    </Page>
  );
}

export default ReportWritten;
