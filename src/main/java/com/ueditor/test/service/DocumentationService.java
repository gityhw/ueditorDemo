package com.ueditor.test.service;

import java.util.List;

import com.ueditor.test.pojo.Documentation;

public interface DocumentationService {
	public Documentation findDocById(String id);

	public Documentation findDocByName(String name);

	public boolean save(Documentation document);

	public boolean saveEdit(Documentation document);

	public List<Documentation> findAll();

	public void deleteDocument(String id);

	public Documentation findDocByProductAndPage(String product, String page);
}
