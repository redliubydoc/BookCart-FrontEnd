import {
	React,
	Component
} from 'react';

import {
	Link,
	Outlet
} from 'react-router-dom';
import AdminAuthFilter from '../../hocs/AdminAuthFilter';
import AdminNavbar from './AdminNavbar';

class Dashboard extends Component {
	render() {
		return (
			<>
				<AdminNavbar/>
				<div className="container-fluid">
					<div className="row flex-nowrap">
						<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
							<div className="my-5 d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">							
								<ul
									className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
									id="menu">

									<li className="nav-item">
										<Link to="/admin/dashboard/sales" 
											className="nav-link align-middle px-0">
											<i className="bi bi-speedometer me-2" style={{fontSize: "25px"}}></i>
											<span className="ms-1 d-none d-sm-inline"> Sales </span>
										</Link>
									</li>
									<li className="nav-item">
										<Link to="/admin/dashboard/review" 
											className="nav-link align-middle px-0">
											<i className="bi bi-book-half me-2" style={{fontSize: "25px"}}></i>
											<span className="ms-1 d-none d-sm-inline"> Review Books </span>
										</Link>
									</li>
									<li className="nav-item">
										<Link to="/admin/dashboard/settings" 
											className="nav-link align-middle px-0">
											<i className="bi bi-gear me-2" style={{fontSize: "25px"}}></i>
											<span className="ms-1 d-none d-sm-inline"> Settings </span>
										</Link>
									</li>
									<li className="nav-item">
										<Link to="/admin/dashboard/admin" 
											className="nav-link align-middle px-0">
											<i className="bi-people-fill me-2" style={{fontSize: "25px"}}></i>
											<span className="ms-1 d-none d-sm-inline"> Admin Management </span>
										</Link>
									</li>
								</ul>
							</div>
						</div>
						{/* content placeholder */}
						<div className="col py-3">
							<Outlet/>
						</div>
					</div>
				</div>

			</>
		);
	}
}

export default AdminAuthFilter(Dashboard);