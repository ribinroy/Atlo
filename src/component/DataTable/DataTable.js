import './DataTable.scss';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import React, { useContext, useState, useCallback } from 'react';
import AtloContext from './../../store/Context';
import GoogleMapReact from 'google-map-react';
import PopUp from './../PopUp/PopUp';
import {
    HMSFormatter,
    timeFormatter,
    dateOnlyFormatter,
} from './../../utilities';

export default function DT() {
    const contextData = useContext(AtloContext);
    const [locationData, setLocationData] = useState({});
    const [showPopUp, setPopUp] = useState(false);

    const handleRowClicked = useCallback((row) => {
        setLocationData({
            lat: parseFloat(row.locationLat),
            long: parseFloat(row.locationLong),
            center: {
                lat: parseFloat(row.locationLat),
                lng: parseFloat(row.locationLong),
            },
            user: row.name,
        });
        setPopUp(true);
    }, []);

    const AnyReactComponent = ({ text }) => (
        <div className='user-pointed'>{text}</div>
    );

    return (
        <div className='dt-wrap'>
            <h1>Full Record</h1>
            <DataTableComponent
                handleRowClicked={handleRowClicked}
                data={contextData.attendanceCalc}
            />
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
        </div>
    );
}

const DataTableComponent = React.memo(function DataTableComponent({
    handleRowClicked,
    data,
}) {
    const columns = [
        {
            name: 'Date',
            selector: 'date',
            sortable: true,
            cell: (d) => dateOnlyFormatter(d, 'date'),
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'User Name',
            selector: 'username',
            sortable: true,
        },
        {
            name: 'UserType',
            selector: 'userType',
            sortable: false,
        },
        {
            name: 'Online',
            selector: 'weekOff',
            sortable: true,
            cell: (d) => {
                return d.weekOff === 'true' ? 'Week Off' : 'Shown';
            },
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
            cell: (d) => HMSFormatter(d, 'effective'),
        },
    ];

    const tableData = {
        columns,
        data,
    };

    return (
        <DataTableExtensions {...tableData}>
            <DataTable
                columns={columns}
                data={data}
                noHeader
                theme={'dark'}
                defaultSortField='date'
                defaultSortAsc={false}
                pagination
                highlightOnHover
                onRowClicked={handleRowClicked}
            />
        </DataTableExtensions>
    );
});
