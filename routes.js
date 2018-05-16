const express = require('express');

var service = require('./utils/service')
var ViewController = require("./controllers")
var AuthController = require("./controllers/auth")
var AdminController = require("./controllers/admin")
var utils = require('./utils')
var logger = require('./utils/logger')
var service = require('./utils/service');

service.loadPartnerConfig(); // load partnerconfig on load of app.

module.exports = function (app) {
	const apiRoutes = express.Router(),
		authRoutes = express.Router(),
		splpageRoutes = express.Router(),
		errorpageRoutes = express.Router(),
		adminpageRoutes = express.Router();

	apiRoutes.use('/', authRoutes);
	authRoutes.post('/logout', AuthController.logout) // logout 
	authRoutes.get('/partner-return', AuthController.authenticateUser) // auth 
	authRoutes.get('/merchant-return', AuthController.authenticateUser) // auth 
	authRoutes.get('/admin-return', AuthController.authenticateUser) // auth 

	apiRoutes.use('/spl', splpageRoutes);
	// partner routes
	splpageRoutes.get('/:partnerCode/login', ViewController.view) //login
	splpageRoutes.get('/:partnerCode/add-merchant', partnerSessionCheck, ViewController.showAddmerchantView) // show add-merchant page
	splpageRoutes.post('/:partnerCode/add-merchant', partnerSessionCheck, ViewController.addMerchants) // add merchants to db 

	// merchant routes
	splpageRoutes.get('/:partnerCode/view-tc', ViewController.merchantLoginView) // show merchant login
	splpageRoutes.get('/:partnerCode/tc', merchantSessionCheck, ViewController.showMerchantTCView) // validate merchant and show merchant TC page

	splpageRoutes.post("/createSalesForceTicket", ViewController.createSalesForceTicket);
		
	// admin routes
	apiRoutes.use('/spl/admin', adminpageRoutes);
	adminpageRoutes.get('/', ViewController.showAdminLogin) // login
	adminpageRoutes.get('/dashboard', adminSessionCheck, AdminController.showAdminView)
	adminpageRoutes.post('/partner', adminSessionCheck, AdminController.addPartner)
	adminpageRoutes.post('/terms', adminSessionCheck, AdminController.uploadTerms)
	adminpageRoutes.get('/get-partner-list', AdminController.getMerchantList)
	
	// post data route
	adminpageRoutes.post('/postdata', AdminController.postData) // post data
	
	

	// error routes
	apiRoutes.use('/error', errorpageRoutes);
	errorpageRoutes.get('/', ViewController.error);

	// Set url for API group routes
	app.use('/', apiRoutes);

	// partner middleware
	function partnerSessionCheck(req, res, next) {
		req.sanitizeParams('partnerCode').escape();
		logger.info('partner email from session - '+ req.session.email)
		if (!req.session.email || !req.session.partner || !req.session.partnerCode) {
			res.redirect('/spl/' + req.params.partnerCode + '/login')
			return;
		}
		partnerJson = service.getPartnerConfig()
		const filteredPartner = partnerJson.filter((partner) => partner.partnerId.indexOf(req.session.email) != -1 && partner.admin != 1 &&
			partner.partnerCode == req.session.partnerCode && req.session.partnerCode == req.params.partnerCode)
		if (filteredPartner && filteredPartner.length == 1) {
			next();
		} else {
			res.status(403).redirect('/error');
		}
	}

	// merchant middleware
	function merchantSessionCheck(req, res, next) {
		req.sanitizeParams('partnerCode').escape();
		logger.info('merchant email from session - '+ req.session.email)
		logger.info('partnerCode  from session - '+ req.session.partnerCode)
		partnerJson = service.getPartnerConfig()
		const filteredPartner = partnerJson.filter((partner) => partner.partnerCode == req.params.partnerCode && partner.admin != 1)
		if (!req.session.email || !req.session.merchant || !req.session.partnerCode) {
			res.redirect('/spl/' + req.params.partnerCode + '/view-tc')
			return;
		}
		if (filteredPartner && filteredPartner.length == 1 && req.session.partnerCode == req.params.partnerCode) {
			next();
			return;
		} else {
			res.status(403).redirect('/error');
			return;
		}
		next();
	}

	// admin middleware
	function adminSessionCheck(req, res, next) {
		logger.info('partner email from session - '+ req.session.email)
		if (!req.session.email || !req.session.admin) {
			res.redirect('/spl/admin/')
			return;
		}
		partnerJson = service.getPartnerConfig()
		const filteredPartner = partnerJson.filter((partner) => partner.partnerId.indexOf(req.session.email) != -1 && partner.admin == 1)
		if (filteredPartner && filteredPartner.length == 1) {
			next();
		} else {
			res.status(403).redirect('/error');
		}
	}
}