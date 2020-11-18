import './DataTable.scss';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import React, { useContext } from 'react';
import AtloContext from './../../store/Context';
import moment from 'moment';

export default function DT() {
    const contextData = useContext(AtloContext);
    const dateOnlyFormatter = (d, key) =>
        d[key] === undefined ? (
            'N/A'
        ) : (
            <span title={moment(d[key]).format('DD/MMMM/YYYY')}>
                <span className='sort-hider'>
                    {moment(d[key]).format('YYYY/MM/DD hh:mm:ss A')}
                </span>
                {moment(d[key]).format('DD/MMM/YYYY')}
            </span>
        );
    const timeFormatter = (d, key) =>
        d[key] === undefined ? (
            'N/A'
        ) : (
            <span title={moment(d[key]).format('DD/MMMM/YYYY hh:mm A')}>
                <span className='sort-hider'>
                    {moment(d[key]).format('YYYY/MM/DD hh:mm:ss A')}
                </span>
                {moment(d[key]).format('hh:mm:ss A')}
            </span>
        );
    const columns = [
        {
            name: 'Date',
            selector: 'date',
            sortable: true,
            cell: dateOnlyFormatter,
        },
        {
            name: 'Name',
            selector: 'username',
            sortable: true,
        },
        {
            name: 'Address',
            selector: 'address',
            sortable: false,
        },
        {
            name: 'UserType',
            selector: 'userType',
            sortable: false,
        },
        {
            name: 'Location',
            selector: 'LocationName',
            sortable: false,
        },
        {
            name: 'In',
            selector: 'clockedIn',
            sortable: true,
            cell: (d) => timeFormatter(d, 'clockedIn'),
        },
        {
            name: 'Lunch In',
            selector: 'lunchIn',
            sortable: true,
            cell: (d) => timeFormatter(d, 'lunchIn'),
        },
        {
            name: 'Lunch out',
            selector: 'lunchOut',
            sortable: true,
            cell: (d) => timeFormatter(d, 'lunchOut'),
        },
        {
            name: 'Tea In',
            selector: 'teaIn',
            sortable: true,
            cell: (d) => timeFormatter(d, 'teaIn'),
        },
        {
            name: 'Tea Out',
            selector: 'teaOut',
            sortable: true,
            cell: (d) => timeFormatter(d, 'teaOut'),
        },
        {
            name: 'Out',
            selector: 'clockedOut',
            sortable: true,
            cell: (d) => timeFormatter(d, 'clockedOut'),
        },
        {
            name: 'Effective',
            selector: 'effective',
            sortable: true,
        },
    ];

    // if()
    const tableData = {
        columns,
        data: contextData.attendanceCalc,
    };

    return (
        <div className='dt-wrap'>
            <DataTableExtensions {...tableData}>
                <DataTable
                    columns={columns}
                    data={contextData.attendanceCalc}
                    noHeader
                    theme={'dark'}
                    defaultSortField='date'
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
                />
            </DataTableExtensions>
            {/* {contextData &&
                contextData.attendanceArray &&
                Object.keys(contextData.attendanceArray).map(function (key) {
                    return (
                        <option value={key}>
                            {contextData.attendanceArray[key].username}
                        </option>
                    );
                })} */}
        </div>
    );
}
