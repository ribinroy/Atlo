import './DataTable.scss';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import React, { useContext, useState, useCallback } from 'react';
import AtloContext from './../../store/Context';
import GoogleMapReact from 'google-map-react';
import PopUp from './../PopUp/PopUp';
import deleteAttendence from './../../api/delete-attendence';
import {
    HMSFormatter,
    timeFormatter,
    dateOnlyFormatter,
    sortFunction,
} from './../../utilities';

export default function DT() {
    const contextData = useContext(AtloContext);
    const [locationData, setLocationData] = useState({});
    const [showPopUp, setPopUp] = useState(false);

    const handleRowClicked = useCallback((row) => {
        if (!row.locationLong || !row.locationLat) {
            alert('Error in location for this user');
            return false;
        }
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

    function clearAttendenceData() {
        const proceedKey = Math.round(Math.random() * 10000000) + '';
        const enteredKey = prompt(
            'There is no recover once you proceed.\nIf you wish to proceed please confirm the below number \n' +
                proceedKey
        );
        if (enteredKey === proceedKey) {
            deleteAttendence();
        } else alert('Numbers dont match. Cancelled');
    }
    return (
        <div className='dt-wrap'>
            <h1>Full Record</h1>
            <button onClick={() => clearAttendenceData()}>
                Clear all attendence
            </button>
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
            sortFunction: (a, b) => sortFunction(a, b, 'date'),
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
            sortable: false,
            cell: (d) => {
                return d.weekOff === 'true'
                    ? 'Week Off'
                    : d.clockedIn !== undefined
                    ? 'Present'
                    : 'Not Present';
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
            sortFunction: (a, b) => sortFunction(a, b, 'clockedIn'),
            cell: (d) => timeFormatter(d, 'clockedIn'),
        },
        {
            name: 'Lunch out',
            selector: 'lunchOut',
            sortable: true,
            sortFunction: (a, b) => sortFunction(a, b, 'lunchOut'),
            cell: (d) => timeFormatter(d, 'lunchOut'),
        },
        {
            name: 'Lunch In',
            selector: 'lunchIn',
            sortable: true,
            sortFunction: (a, b) => sortFunction(a, b, 'lunchIn'),
            cell: (d) => timeFormatter(d, 'lunchIn'),
        },
        {
            name: 'Tea Out',
            selector: 'teaOut',
            sortable: true,
            sortFunction: (a, b) => sortFunction(a, b, 'teaOut'),
            cell: (d) => timeFormatter(d, 'teaOut'),
        },
        {
            name: 'Tea In',
            selector: 'teaIn',
            sortable: true,
            sortFunction: (a, b) => sortFunction(a, b, 'teaIn'),
            cell: (d) => timeFormatter(d, 'teaIn'),
        },
        {
            name: 'Out',
            selector: 'clockedOut',
            sortable: true,
            sortFunction: (a, b) => sortFunction(a, b, 'clockedOut'),
            cell: (d) => timeFormatter(d, 'clockedOut'),
        },
        {
            name: 'Effective',
            selector: 'effective',
            sortable: false,
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
                defaultSortAsc={true}
                pagination
                highlightOnHover
                onRowClicked={handleRowClicked}
            />
        </DataTableExtensions>
    );
});
