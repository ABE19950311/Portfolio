import Header from "../pages/components/header"
import {useState} from "react"
import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

/* eslint-disable */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
        iconUrl: markerIcon.src,
        iconRetinaUrl: markerIcon2x.src,
        shadowUrl: markerShadow.src,
    });
/* eslint-disable */

const LocationMarker = ()=>{
    const [position,setPosition] = useState(null)

    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng as any)
            map.flyTo(e.latlng,map.getZoom())
        }
    })

    return position===null ? null : (
        <Marker position={position}>
            <Popup>現在地点</Popup>
        </Marker>
    )
}


const Map =()=>{

    return(
        <>
        <Header />
        <MapContainer
            center={[35.710063, 139.8107]}
            zoom={10}
            doubleClickZoom={false}
            scrollWheelZoom={true}
            style={{height:"100vh",width:"100%"}}
        >
            <TileLayer 
                    attribution='Google マップ'
                    url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"/>

            <LayersControl position="topright">

                <LayersControl.Overlay name="ハザードマップ 洪水浸水想定区域">
                <TileLayer 
                    opacity={0.5}
                    url="https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png"/>
                </LayersControl.Overlay>

                <LayersControl.Overlay name="ハザードマップ 浸水継続時間">
                <TileLayer 
                    opacity={0.5}
                    url="https://disaportaldata.gsi.go.jp/raster/01_flood_l2_keizoku_data/{z}/{x}/{y}.png"/>
                </LayersControl.Overlay>

                <LayersControl.Overlay name="ハザードマップ 高潮浸水想定区域">
                <TileLayer 
                    opacity={0.5}
                    url="https://disaportaldata.gsi.go.jp/raster/03_hightide_l2_shinsuishin_data/{z}/{x}/{y}.png"/>
                </LayersControl.Overlay>

                <LayersControl.Overlay name="ハザードマップ 津波浸水想定">
                <TileLayer 
                    opacity={0.5}
                    url="https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend_data/{z}/{x}/{y}.png"/>
                </LayersControl.Overlay>

                <LayersControl.Overlay name="ハザードマップ 土石流">
                <TileLayer 
                    opacity={0.5}
                    url="https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki/{z}/{x}/{y}.png"/>
                </LayersControl.Overlay>

                <LayersControl.Overlay name="ハザードマップ 急傾斜地の崩壊">
                <TileLayer 
                    opacity={0.5}
                    url="https://disaportaldata.gsi.go.jp/raster/05_kyukeishakeikaikuiki/{z}/{x}/{y}.png"/>
                </LayersControl.Overlay>

                <LayersControl.Overlay name="ハザードマップ 地すべり">
                <TileLayer 
                    opacity={0.5}
                    url="https://disaportaldata.gsi.go.jp/raster/05_jisuberikeikaikuiki/{z}/{x}/{y}.png"/>
                </LayersControl.Overlay>

            </LayersControl>

            <LocationMarker />
    
        </MapContainer>
        </>
    )
}

export default Map;