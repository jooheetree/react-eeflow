import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Button, Table, TableBody, TableRow, TableCell, Typography
} from '@material-ui/core';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import {documents} from "../../../mock";
import MY_approverLine from "../../../components/MY_approverLine";
import FormDialog from "../Dialog";
import MY_opinion from "../../../components/MY_opinion";
import MY_InvoiceDetailCard from "../../../components/MY_InvoiceDetailCard";
import {INVOICETYPE} from "../../My_ReportCreate";
import MY_InvoiceDetailCard_P from "../../../components/MY_InvoiceDetailCard_P";
import MY_InvoiceDetailCard_R from "../../../components/MY_InvoiceDetailCard_R";

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 900,
    [theme.breakpoints.up('lg')]: {
      width: '100%',
      backgroundColor: 'transparent'
    },
    maxHeight: '95%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  innerDiv: {
    [theme.breakpoints.up('lg')]: {
      width: '900px',
      backgroundColor: 'white'
    }
  },
  tableCellContent: {
    width: '50px',
    whiteSpace: 'nowrap',
    backgroundColor: '#eeeeee'

  },
  cardContent: {
    paddingTop: theme.spacing(1)
  },
  cardHeaderRoot: {
    backgroundColor: theme.palette.primary.main,
  },
  cardHeaderTitle: {
    color: theme.palette.primary.contrastText
  },
  actions: {
    justifyContent: 'flex-end'
  },
  approverGrid: {
    paddingBottom: theme.spacing(8)
  }
}));

function Index({ open, onClose, onComplete, document, invoices, className }) {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleApprove = (opinion: string) => {
    onComplete(opinion, '승인');
    handleClose();
  };

  const handleReject = (opinion: string) => {
    onComplete(opinion, '반려');
    handleClose();
  };

  const handleKeyPress = (event) => {
    if (event.key === '1') { // TODO 1로 임시
      onComplete('', '승인');
    }
  };

  let invoiceDetailCard = null;
  debugger;
  if (document.document_type === INVOICETYPE.채무발생 || document.document_type === INVOICETYPE.채권발생) {
    invoiceDetailCard = (
      <MY_InvoiceDetailCard
        type={'read'}
        invoices={invoices}
        attachments={document.attachments} />
    )
  } else if (document.document_type === INVOICETYPE.채무정리) {
    invoiceDetailCard = (
      <MY_InvoiceDetailCard_P
        type={'read'}
        invoices={invoices}
        attachments={document.attachments} />
    )
  } else if (document.document_type === INVOICETYPE.채권정리) {
    invoiceDetailCard = (
      <MY_InvoiceDetailCard_R
        type={'read'}
        invoices={invoices}
        attachments={document.attachments} />
    )
  } else if (document.document_type === INVOICETYPE.일반전표) {
    invoiceDetailCard = (
      <MY_InvoiceDetailCard
        type={'read'}
        invoices={invoices}
        attachments={document.attachments} />
    )
  }

  return (
    <>
      <Modal
        onKeyPress={handleKeyPress}
        disableBackdropClick
        onClose={onClose}
        open={open}
      >
        <Card
          className={clsx(classes.root, className)}
        >
          <div className={classes.innerDiv}>
            <CardHeader
              classes={{root: classes.cardHeaderRoot, title: classes.cardHeaderTitle}}
              title="미결함"
              action={(
                <Button
                  onClick={handleClickOpen}
                  color="primary"
                  variant="contained"
                >
                  결재
                </Button>
                )}
            />
            <Divider />
            <CardContent>
              <Grid
                className={classes.approverGrid}
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Grid
                  item
                  md={document.signs.length + 2}
                  xs={12}
                >
                  <MY_approverLine signs={document.signs} />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className={classes.tableCellContent}>작성자</TableCell>
                          <TableCell>{document.author}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className={classes.tableCellContent}>작성일자</TableCell>
                          <TableCell>{document.created}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className={classes.tableCellContent}>제목</TableCell>
                          <TableCell>{document.title}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Divider />
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  {invoiceDetailCard}
                  {/*<MY_InvoiceDetailCard*/}
                  {/*  type={'read'}*/}
                  {/*  invoices={invoices}*/}
                  {/*  attachments={document.attachments} />*/}
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <MY_opinion signs={document.signs.filter(sign => sign.comment !== null)}/>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
              <Button
                color="primary"
                variant="contained"
                onClick={onClose}
              >
                닫기
              </Button>
            </CardActions>
          </div>

          <FormDialog
            open={openDialog}
            onClose={handleClose}
            onApprove={handleApprove}
            onReject={handleReject} />
        </Card>
      </Modal>
    </>
  );
}

Index.propTypes = {
  className: PropTypes.string,
  document: PropTypes.shape(documents),
  invoices: PropTypes.array,
  onClose: PropTypes.func,
  onComplete: PropTypes.func,
  open: PropTypes.bool
};

Index.defaultProps = {
  open: false,
};

export default Index;
