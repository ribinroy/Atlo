import './Home.scss';
import React, { useContext, useCallback, useState } from 'react';
import AtloContext from '../../store/Context';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import GoogleMapReact from 'google-map-react';
import PopUp from '../PopUp/PopUp';
import {
    HMSFormatter,
    timeFormatter,
    dateOnlyFormatter,
    timeFormatterExtraKey,
} from '../../utilities';

export default function ListAllUsers() {
    const contextData = useContext(AtloContext);
    const [locationData, setLocationData] = useState({});
    const [showPopUp, setPopUp] = useState(false);

    const handleRowClicked = useCallback((row) => {
        if (
            !row.todayAttendance ||
            !row.todayAttendance.locationLat ||
            !row.todayAttendance.locationLong
        ) {
            alert('User not shown - no location data');
            return false;
        }

        setLocationData({
            lat: parseFloat(row.todayAttendance.locationLat),
            long: parseFloat(row.todayAttendance.locationLong),
            center: {
                lat: parseFloat(row.todayAttendance.locationLat),
                lng: parseFloat(row.todayAttendance.locationLong),
            },
            user: row.name,
        });
        setPopUp(true);
    }, []);

    const AnyReactComponent = ({ text }) => (
        <div className='user-pointed'>{text}</div>
    );
    const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Online',
            selector: 'isShown',
            sortable: true,
        },
        {
            name: 'Branch',
            selector: 'branch',
            sortable: false,
        },
        {
            name: 'Location',
            selector: 'LocationName',
            sortable: false,
            cell: (d) => {
                return d.todayAttendance
                    ? d.todayAttendance.LocationName
                    : 'N/A';
            },
        },
        {
            name: 'In',
            selector: 'todayAttendance.clockedIn',
            sortable: true,
            cell: (d) =>
                timeFormatterExtraKey(d, 'todayAttendance', 'clockedIn'),
        },
        {
            name: 'Lunch out',
            selector: 'lunchOut',
            sortable: true,
            cell: (d) =>
                timeFormatterExtraKey(d, 'todayAttendance', 'lunchOut'),
        },
        {
            name: 'Lunch In',
            selector: 'lunchIn',
            sortable: true,
            cell: (d) => timeFormatterExtraKey(d, 'todayAttendance', 'lunchIn'),
        },
        {
            name: 'Tea Out',
            selector: 'teaOut',
            sortable: true,
            cell: (d) => timeFormatterExtraKey(d, 'todayAttendance', 'teaOut'),
        },
        {
            name: 'Tea In',
            selector: 'teaIn',
            sortable: true,
            cell: (d) => timeFormatterExtraKey(d, 'todayAttendance', 'teaIn'),
        },
        {
            name: 'Out',
            selector: 'clockedOut',
            sortable: true,
            cell: (d) =>
                timeFormatterExtraKey(d, 'todayAttendance', 'clockedOut'),
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
            <PopUp onClose={() => setPopUp(false)} visible={showPopUp}>
                {locationData.center !== undefined && (
                    <div className='map-wrap'>
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                key: 'AIzaSyB-SMSufNXZ4YDBTRMF_-vgsktcuAhXDCA',
                            }}
                            defaultCenter={locationData.center}
                            defaultZoom={20}>
                            <AnyReactComponent
                                lat={locationData.lat}
                                lng={locationData.long}
                                text={locationData.user}
                            />
                        </GoogleMapReact>
                    </div>
                )}
            </PopUp>
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
            <h1>Today</h1>

            <DataTableExtensions {...tableData}>
                <DataTable
                    columns={columns}
                    data={contextData.todayUsersData}
                    noHeader
                    theme={'dark'}
                    defaultSortField='isShown'
                    defaultSortAsc={false}
                    // pagination
                    highlightOnHover
                    onRowClicked={handleRowClicked}
                />
            </DataTableExtensions>
        </div>
    );
}
