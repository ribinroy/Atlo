import './UsersList.scss';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import React, { useContext, useState, useCallback } from 'react';
import AddUserComponent from '../UsersList/AddUserComponent';
import AtloContext from '../../store/Context';
import GoogleMapReact from 'google-map-react';
import PopUp from '../PopUp/PopUp';
import {
    HMSFormatter,
    timeFormatter,
    dateOnlyFormatter,
} from '../../utilities';

export default function UsersList() {
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
        <div className='container'>
            <div className='dt-wrap'>
                <h1>Users List</h1>
                <AddUserComponent />
                <DataTableComponent
                    handleRowClicked={handleRowClicked}
                    data={contextData.userArrayCalc}
                />
                {/* <PopUp onClose={() => setPopUp(false)} visible={showPopUp}>
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
            </PopUp> */}
            </div>
        </div>
    );
}

const DataTableComponent = React.memo(function DataTableComponent({
    handleRowClicked,
    data,
}) {
    const columns = [
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
            name: 'Branch',
            selector: 'branch',
            sortable: true,
        },
        {
            name: 'Department',
            selector: 'department',
            sortable: true,
        },
        {
            name: 'Designation',
            selector: 'designation',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Number',
            selector: 'number',
            sortable: true,
        },
        {
            name: 'Type',
            selector: 'userType',
            sortable: true,
        },
        // {
        //     name: 'Device Logged in',
        //     selector: 'deviceModel',
        //     sortable: true,
        // },
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
                defaultSortField='name'
                defaultSortAsc={false}
                pagination
                highlightOnHover
                onRowClicked={handleRowClicked}
            />
        </DataTableExtensions>
    );
});
