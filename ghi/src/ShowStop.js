import { useGetStopQuery } from "./store/tripsApi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function ShowStop() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: stop, isLoading } = useGetStopQuery(id)
}

export default ShowStop;