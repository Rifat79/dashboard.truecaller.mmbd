
import './style.css';
export const ModalSpinner = ({height, width}) => {
    return (
        <div style={{height: height, width: width}} className="loader-main-body">
            <div class="loading">
                <h2 className='spinner-loader-text-style'>Loading...</h2>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            {/* <span>loading...</span> */}
        </div>
    )
}