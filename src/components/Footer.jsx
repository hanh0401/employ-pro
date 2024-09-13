import { Navbar, Container } from 'react-bootstrap'

function Footer() {
    return <>
    <Navbar expand="lg" className="bg-white mt-5">
        <Container className="container d-none d-sm-block foot-size px-4">
            <div className="row border-bottom">
                <Navbar.Brand href="/" title="TLJOB" className="mx-auto ">
                    <img
                        src="/public/TLJOB-Logo.png"
                        alt="TL-JOB Logo"
                        style={{ maxHeight: '60px' }}
                    />
                </Navbar.Brand>
                <div className="col-3">
                    <p className="fw-bold foot-h">DÀNH CHO ỨNG VIÊN</p>
                    <ul className="list-unstyled">
                        <li><a href="/candidates/Home" class="link-secondary hover-underline">Trang chủ</a></li>
                        <li><a href="/candidates/Profile" class="link-secondary hover-underline">Quản lý hồ sơ cá nhân</a></li>
                        <li><a href="/candidates/CV" class="link-secondary hover-underline">Quản lý CV</a></li>
                        <li><a href="/candidates/Feedback" class="link-secondary hover-underline">Phản hồi</a></li>
                    </ul>
                </div>
                <div className="col-3">
                    <p className="fw-bold foot-h">DÀNH CHO NHÀ TUYỂN DỤNG</p>
                    <ul className="list-unstyled">
                        <li><a href="/employers/Home" class="link-secondary hover-underline">Trang chủ</a></li>
                        <li><a href="/employers/company" class="link-secondary hover-underline">Quản lý hồ sơ công ty</a></li>
                        <li><a href="/employers/post" class="link-secondary hover-underline">Quản lý tin tuyển dụng</a></li>
                        <li><a href="/employers/Feedback" class="link-secondary hover-underline">Phản hồi</a></li>

                    </ul>
                </div>
                <div className="col-3 fw-light">
                    <p className="fw-bold foot-h">Kết nối với chúng tôi</p>
                    <div className="row mb-4">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/800px-Facebook_Logo_%282019%29.png"
                            className="col-3 rounded img-fluid"
                            style={{ maxWidth: 50, height: "auto" }}
                            alt=""
                            />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img
                            src="https://png.pngtree.com/png-clipart/20220809/original/pngtree-youtube-logo-icon-picture-image_3560542.png"
                            className="col-3 rounded img-fluid"
                            style={{ maxWidth: 50, height: "auto" }}
                            alt=""
                            />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img
                            src="https://lh4.googleusercontent.com/proxy/VsL6JNVC4070zR1sW99mpP0paIwz1griutLInvqA3n1wKARV9o_HxAwcJIoz2FNZ8ASeI5fzNji1b4G7fpPnMKaBi7w04sM9A78pC-A2xsdoRQY4BAjZC9R4evjWCg"
                            className="col-3 rounded img-fluid"
                            style={{ maxWidth: 50, height: "auto" }}
                            alt=""
                            />
                        </a>
                </div>
                </div>
            </div>
            <div className="border-bottom fw-light">
                <p className="fw-bold foot-h">Trường đại học Thăng Long - Thang Long University</p>
                <ul className="list-unstyled">
                    <li>Khoa CNTT - Lớp Công nghệ phần mềm 02 - Nhóm 3</li>
                    <li>Địa chỉ: Nghiêm Xuân Yêm, Đại Kim, Hoàng Mai, Hà Nội</li>
                    <li>Hotline: <span class="text-primary">037x xxx 043</span></li>
                </ul>
            </div>
        </Container>
    </Navbar>
    </>
}

export default Footer