import './Home.scss';
import React, { useContext } from 'react';
import AtloContext from './../../store/Context';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {
    HMSFormatter,
    timeFormatter,
    dateOnlyFormatter,
} from './../../utilities';

export default function ListAllUsers() {
    const contextData = useContext(AtloContext);
    debugger;
    const columns = [
        {
            name: 'Date',
            selector: 'date',
            sortable: true,
            cell: (d) => dateOnlyFormatter(d, 'date'),
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
            selector: 'todayAttendance.clockedIn',
            sortable: true,
            cell: (d) => timeFormatter(d, 'todayAttendance.clockedIn'),
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
            cell: (d) => HMSFormatter(d, 'effective'),
        },
    ];

    const tableData = {
        columns,
        data: contextData.todayUsersData,
    };

    return (
        <div className='all-users-wrap'>
            {/* {contextData.todayUsersData.length > 0 &&
                contextData.todayUsersData.map((el, index) => {
                    return (
                        <div
                            className={
                                'user-item ' +
                                (!el.todayAttendance ? ' not-shown ' : '')
                            }
                            key={index}>
                            {el.name}
                        </div>
                    );
                })} */}

            <DataTableExtensions {...tableData}>
                <DataTable
                    columns={columns}
                    data={contextData.todayUsersData}
                    noHeader
                    theme={'dark'}
                    defaultSortField='date'
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
                    // onRowClicked={handleRowClicked}
                />
            </DataTableExtensions>
        </div>
    );
}
