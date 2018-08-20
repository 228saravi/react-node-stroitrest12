import React, { Component } from 'react';

class index extends Component {
    render() {
        return (
            <section className="section head">
                <div className="nav">
                    <a className="logo" href="">
                        <img className="logo-img" src={require("../../img/logo.png")}/>
                    </a>
                    <ul className="navbar">
                        <li className="navbar_home"> <a className="navbar__link" href="">Главная</a></li>
                        <li className="navbar_ourproject"> <a className="navbar__link" href="">Наши проекты</a></li>
                        <li className="navbar_jobs"> <a className="navbar__link" href="">Вакансии</a></li>
                        <li className="navbar_contact"><a className="navbar__link" href="">Контакты</a></li>
                    </ul>
                    <ul className="navreg">
                        <li className="registrasion"><a className="registrasion__link" href="">Авторизация</a></li>
                    </ul></div><div className="head__tagline"> ОАО «Строительный трест №12» </div>
                    <ul className="info">
                        <li className="info__txt">90<span className="info__txt_deployed"> лет</span><div className="info__txt_deployed">успешной <br/>работы</div></li>
                        <li className="info__txt">500<span className="info__txt_deployed"> объектов</span><div className="info__txt_deployed">более 500 выполненых<br/>объектов</div></li>
                        <li className="info__txt">1000 <span className="info__txt_deployed"> работников</span><div className="info__txt_deployed"> более 1000 рабочих <br/>мест</div></li>
                        </ul>
            </section>
        );
    }
}

export default index;