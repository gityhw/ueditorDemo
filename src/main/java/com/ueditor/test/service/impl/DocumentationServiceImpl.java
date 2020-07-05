package com.ueditor.test.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ueditor.test.dao.DocumentaionDao;
import com.ueditor.test.pojo.Documentation;
import com.ueditor.test.service.DocumentationService;

@Service("documentationService")
public class DocumentationServiceImpl implements DocumentationService {
	
	@Resource
	private DocumentaionDao docDao;
	
	@Override
	public Documentation findDocById(String id) {
		return docDao.selectByPrimaryKey(id);
	}

	@Override
	public Documentation findDocByName(String name) {
		return this.docDao.findByName(name);
	}

	@Override
	public boolean save(Documentation document) {
		int result = docDao.insert(document);
		return result > 0;
	}

	@Override
	public boolean saveEdit(Documentation document) {
		//根据id找到原report
		Documentation orgreport = docDao.selectByPrimaryKey(document.getId());
		//根据saveParam修改原report
		orgreport.setName(document.getName());
		orgreport.setProduct(document.getProduct());
		orgreport.setPage(document.getPage());
		orgreport.setContent(document.getContent());
		orgreport.setContent1(document.getContent1());	
		//保存原来的report
		try {
			int result = docDao.updateByPrimaryKey(orgreport);
			return result > 0;
		}catch(Exception e) {
			return false;
		}
	}

	@Override
	public List<Documentation> findAll() {
		return docDao.findAll();
	}

	@Override
	public void deleteDocument(String id) {
		docDao.deleteByPrimaryKey(id);
	}

	@Override
	public Documentation findDocByProductAndPage(String product, String page) {
		return docDao.findDocByProductAndPage(product,page);
	}
	
}