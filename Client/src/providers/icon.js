import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBars,
    faUser,
    faArrowRightFromBracket,
    faHouse,
    faCloudArrowUp,
    faGear
} from '@fortawesome/free-solid-svg-icons';


const icon = {
    init : function (){
        library.add(faBars, faUser, faArrowRightFromBracket, faHouse, faCloudArrowUp, faGear);
    }
}
export default icon;