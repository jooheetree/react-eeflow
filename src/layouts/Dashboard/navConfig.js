/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, {useEffect} from 'react';
import {colors} from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ViewConfigIcon from '@material-ui/icons/ViewComfy';
import CreateIcon from '@material-ui/icons/Create';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ListIcon from '@material-ui/icons/List';
import Label from 'src/components/Label';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import {useDispatch, useSelector} from "react-redux";
import {getErpTodoCount, getTodoCount, logout} from "../../actions";

export function MY_navConfig() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(getTodoCount(localStorage.getItem('token')));
    dispatch(getErpTodoCount(localStorage.getItem('token')));
  }, [])

  return [
    {
      subheader: '결재문서',
      items: [
        {
          title: '미결함',
          href: '/reportSign',
          icon: ReceiptIcon,
          label: () => {
            return (
              session.todoCount.미결함 > 0 ? (
            <Label
              color={colors.red[500]}
              shape="rounded"
            >
              {session.todoCount.미결함}
            </Label>
              ): null
            )
          }
        },
        {
          title: '상신함',
          href: '/reportWritten',
          icon: ReceiptRoundedIcon,
        },
        {
          title: '기결함',
          href: '/reportApproved',
          icon: DescriptionOutlinedIcon
        },
        {
          title: '반려함',
          href: '/reportRejected',
          icon: DescriptionRoundedIcon
        },
      ]
    },
    {
      subheader: '결재작성',
      items: [
        {
          title: '채무발생작성',
          href: '/reportWrite',
          icon: CreateIcon,
          label: () => {
            return (
              session.todoCount.채무발생 > 0 ? (
                <Label
                  color={colors.blue[500]}
                  shape="rounded"
                >
                  {session.todoCount.채무발생}
                </Label>
              ) : null
            )
          }
        },
        {
          title: '채무정리작성',
          href: '/reportWritePayment',
          icon: BorderColorIcon,
          label: () => {
            return (
              session.todoCount.채무정리 > 0 ? (
                <Label
                  color={colors.deepPurple[500]}
                  shape="rounded"
                >
                  {session.todoCount.채무정리}
                </Label>
              ) : null
            )
          }
        },
        {
          title: '채권발생작성',
          href: '/reportWriteInvoice',
          icon: CreateOutlinedIcon,
          label: () => {
            return (
              session.todoCount.채권발생 > 0 ? (
                <Label
                  color={colors.pink[500]}
                  shape="rounded"
                >
                  {session.todoCount.채권발생}
                </Label>
              ) : null
            )
          }
        },
        {
          title: '채권정리작성',
          href: '/reportWriteReceipt',
          icon: BorderColorOutlinedIcon,
          label: () => {
            return (
              session.todoCount.채권정리 > 0 ? (
                <Label
                  color={colors.green[500]}
                  shape="rounded"
                >
                  {session.todoCount.채권정리}
                </Label>
              ) : null
            )
          }
        },
        {
          title: '일반전표작성',
          href: '/reportWriteNacct',
          icon: CreateIcon,
          label: () => {
            return (
              session.todoCount.일반전표 > 0 ? (
                <Label
                  color={colors.purple[500]}
                  shape="rounded"
                >
                  {session.todoCount.일반전표}
                </Label>
              ) : null
            )
          }
        },
      ]
    },
  ];
}


// export default [
//   {
//     subheader: '결재문서',
//     items: [
//       {
//         title: '미결함',
//         href: '/reportSign',
//         icon: ReceiptIcon,
//         label: () => (
//           <Label
//             color={colors.red[500]}
//             shape="rounded"
//           >
//             4
//           </Label>
//         )
//       },
//       {
//         title: '상신함',
//         href: '/reportWritten',
//         icon: ReceiptRoundedIcon
//       },
//       {
//         title: '기결함',
//         href: '/reportApproved',
//         icon: DescriptionOutlinedIcon
//       },
//       {
//         title: '반려함',
//         href: '/reportRejected',
//         icon: DescriptionRoundedIcon
//       },
//     ]
//   },
//   {
//     subheader: '결재작성',
//     items: [
//       {
//         title: '채무발생작성',
//         href: '/reportWrite',
//         icon: CreateIcon
//       },
//       {
//         title: '채무정리작성',
//         href: '/reportWritePayment',
//         icon: BorderColorIcon
//       },
//       {
//         title: '채권발생작성',
//         href: '/reportWriteInvoice',
//         icon: CreateOutlinedIcon
//       },
//       {
//         title: '채권정리작성',
//         href: '/reportWriteReceipt',
//         icon: BorderColorOutlinedIcon
//       },
//       {
//         title: '일반전표작성',
//         href: '/reportWriteNacct',
//         icon: CreateIcon
//       },
//     ]
//   },
//   // {
//   //   subheader: 'Pages',
//   //   items: [
//   //     {
//   //       title: 'Overview',
//   //       href: '/overview',
//   //       icon: HomeIcon
//   //     },
//   //     {
//   //       title: 'Dashboards',
//   //       href: '/dashboards',
//   //       icon: DashboardIcon,
//   //       items: [
//   //         {
//   //           title: 'Default',
//   //           href: '/dashboards/default'
//   //         },
//   //         {
//   //           title: 'Analytics',
//   //           href: '/dashboards/analytics'
//   //         }
//   //       ]
//   //     },
//   //     {
//   //       title: 'Management',
//   //       href: '/management',
//   //       icon: BarChartIcon,
//   //       items: [
//   //         {
//   //           title: 'Customers',
//   //           href: '/management/customers'
//   //         },
//   //         {
//   //           title: 'Customer Details',
//   //           href: '/management/customers/1/summary'
//   //         },
//   //         {
//   //           title: 'Projects',
//   //           href: '/management/projects'
//   //         },
//   //         {
//   //           title: 'Orders',
//   //           href: '/management/orders'
//   //         },
//   //         {
//   //           title: 'Order Details',
//   //           href: '/management/orders/1'
//   //         }
//   //       ]
//   //     },
//   //     {
//   //       title: 'Social Feed',
//   //       href: '/social-feed',
//   //       icon: PeopleIcon
//   //     },
//   //     {
//   //       title: 'Profile',
//   //       href: '/profile',
//   //       icon: PersonIcon,
//   //       items: [
//   //         {
//   //           title: 'Timeline',
//   //           href: '/profile/1/timeline'
//   //         },
//   //         {
//   //           title: 'Connections',
//   //           href: '/profile/1/connections'
//   //         },
//   //         {
//   //           title: 'Projects',
//   //           href: '/profile/1/projects'
//   //         },
//   //         {
//   //           title: 'Reviews',
//   //           href: '/profile/1/reviews'
//   //         }
//   //       ]
//   //     },
//   //     {
//   //       title: 'Project',
//   //       href: '/projects',
//   //       icon: FolderIcon,
//   //       items: [
//   //         {
//   //           title: 'Browse',
//   //           href: '/projects'
//   //         },
//   //         {
//   //           title: 'Create',
//   //           href: '/projects/create'
//   //         },
//   //         {
//   //           title: 'Overview',
//   //           href: '/projects/1/overview'
//   //         },
//   //         {
//   //           title: 'Files',
//   //           href: '/projects/1/files'
//   //         },
//   //         {
//   //           title: 'Activity',
//   //           href: '/projects/1/activity'
//   //         },
//   //         {
//   //           title: 'Subscribers',
//   //           href: '/projects/1/subscribers'
//   //         }
//   //       ]
//   //     },
//   //     {
//   //       title: 'Invoice',
//   //       href: '/documents/1',
//   //       icon: ReceiptIcon
//   //     },
//   //     {
//   //       title: 'Kanban Board',
//   //       href: '/kanban-board',
//   //       icon: ListAltIcon
//   //     },
//   //     {
//   //       title: 'Mail',
//   //       href: '/mail',
//   //       icon: MailIcon,
//   //       label: () => (
//   //         <Label
//   //           color={colors.red[500]}
//   //           shape="rounded"
//   //         >
//   //           2
//   //         </Label>
//   //       )
//   //     },
//   //     {
//   //       title: 'Chat',
//   //       href: '/chat',
//   //       icon: ChatIcon,
//   //       label: () => (
//   //         <Label
//   //           color={colors.red[500]}
//   //           shape="rounded"
//   //         >
//   //           4
//   //         </Label>
//   //       )
//   //     },
//   //     {
//   //       title: 'Calendar',
//   //       href: '/calendar',
//   //       icon: CalendarTodayIcon,
//   //       label: () => <Label color={colors.green[500]}>New</Label>
//   //     },
//   //     {
//   //       title: 'Settings',
//   //       href: '/settings',
//   //       icon: SettingsIcon,
//   //       items: [
//   //         {
//   //           title: 'General',
//   //           href: '/settings/general'
//   //         },
//   //         {
//   //           title: 'Subscription',
//   //           href: '/settings/subscription'
//   //         },
//   //         {
//   //           title: 'Notifications',
//   //           href: '/settings/notifications'
//   //         },
//   //         {
//   //           title: 'Security',
//   //           href: '/settings/security'
//   //         }
//   //       ]
//   //     },
//   //     {
//   //       title: 'Authentication',
//   //       href: '/auth',
//   //       icon: LockOpenIcon,
//   //       items: [
//   //         {
//   //           title: 'Login',
//   //           href: '/auth/login'
//   //         },
//   //         {
//   //           title: 'Register',
//   //           href: '/auth/register'
//   //         }
//   //       ]
//   //     },
//   //     {
//   //       title: 'Errors',
//   //       href: '/errors',
//   //       icon: ErrorIcon,
//   //       items: [
//   //         {
//   //           title: 'Error 401',
//   //           href: '/errors/error-401'
//   //         },
//   //         {
//   //           title: 'Error 404',
//   //           href: '/errors/error-404'
//   //         },
//   //         {
//   //           title: 'Error 500',
//   //           href: '/errors/error-500'
//   //         }
//   //       ]
//   //     }
//   //   ]
//   // },
//   // {
//   //   subheader: 'Support',
//   //   items: [
//   //     {
//   //       title: 'Components',
//   //       href: '/components',
//   //       icon: ViewConfigIcon,
//   //       items: [
//   //         {
//   //           title: 'Buttons',
//   //           href: '/components/buttons'
//   //         },
//   //         {
//   //           title: 'Cards',
//   //           href: '/components/cards'
//   //         },
//   //         {
//   //           title: 'Chips',
//   //           href: '/components/chips'
//   //         },
//   //         {
//   //           title: 'Lists',
//   //           href: '/components/lists'
//   //         },
//   //         {
//   //           title: 'Forms',
//   //           href: '/components/forms'
//   //         },
//   //         {
//   //           title: 'Modals',
//   //           href: '/components/modals'
//   //         },
//   //         {
//   //           title: 'Typography',
//   //           href: '/components/typography'
//   //         }
//   //       ]
//   //     },
//   //     {
//   //       title: 'Presentation',
//   //       href: '/presentation',
//   //       icon: PresentToAllIcon
//   //     },
//   //     {
//   //       title: 'Getting started',
//   //       href: '/getting-started',
//   //       icon: CodeIcon
//   //     },
//   //     {
//   //       title: 'Changelog',
//   //       href: '/changelog',
//   //       icon: ListIcon,
//   //       label: () => <Label color={colors.blue['500']}>v1.3.0</Label>
//   //     }
//   //   ]
//   // }
// ];
