/*
 * Copyright (c) 2012-2032 ACCA.
 * All Rights Reserved.
 */
package com.ueditor.test.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ueditor.test.pojo.Documentation;
import com.ueditor.test.service.DocumentationService;

/**
 * 
 * @des 公共页面-编辑各个页面的说明文档action
 * @author coco
 * @date 2019年04月24日
 * @email maxy@acca.com.cn
 */
@Controller
@RequestMapping(value = "/base/documentation")
public class DocumentationAction {
	
	@Autowired
	private DocumentationService documentationService;
	
	/**
	 * 进入说明文档页面
	 * @return
	 */
	@RequestMapping("/openpage")
	public String openPage() {
		return "base/documentation";
	}
	
	/**
	 * 保存说明文档
	 * @param queryParam
	 * @return
	 */
	@RequestMapping("/saveDocument")
	@ResponseBody
	public Map<String, Object> saveDocument(String name,String product,String page,String content,String content1){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Documentation doc = documentationService.findDocByName(name);
		if(null!=doc){
			resultMap.put("flag", false);
			resultMap.put("message", "该标题名称已存在");
		}else {
			UUID uuid  =  UUID.randomUUID();
			String id=uuid.toString();
			id=id.replace("-", "");//替换掉中间的那个横杠  
			
			Documentation document = new Documentation();
			document.setId(id);
			document.setName(name);
			document.setProduct(product);
			document.setPage(page);
			document.setContent(content);
			document.setContent1(content1);
			boolean flag = documentationService.save(document);
			if(flag) {
				resultMap.put("flag", true);
				resultMap.put("message", "保存成功");
			}else {
				resultMap.put("flag", false);
				resultMap.put("message", "保存失败");
			}
		}
		return resultMap;
	}
	
	
	/**
	 * 编辑说明文档
	 * @param queryParam
	 * @return
	 */
	@RequestMapping("/editDocument")
	@ResponseBody
	public Map<String, Object> editDocument(String id,String name,String product,String page,String content,String content1){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Documentation doc = documentationService.findDocByName(name);
		if(!id.equals(doc.getId())){
			resultMap.put("flag", false);
			resultMap.put("message", "该标题名称已存在");
		}else {
			Documentation document = new Documentation();
			document.setId(id);
			document.setName(name);
			document.setProduct(product);
			document.setPage(page);
			document.setContent(content);
			document.setContent1(content1);
			boolean flag = documentationService.saveEdit(document);
			if(flag) {
				resultMap.put("flag", true);
				resultMap.put("message", "编辑成功");
			}else {
				resultMap.put("flag", false);
				resultMap.put("message", "保存失败");
			}
		}
		return resultMap;
	}
	
	
	
	/**
	 * 初始化说明文档列表
	 * @param queryParam
	 * @return
	 */
	@RequestMapping("/initDocument")
	@ResponseBody
	public Map<String, Object> initDocument(@RequestParam(value = "rows", defaultValue = "10") int pageSize,
            @RequestParam(value = "page", defaultValue = "0") int pageNumber,
            @RequestParam(value = "sort", defaultValue = "id") String sortName,
            @RequestParam(value = "order", defaultValue = "ASC") String sortOrder){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if(pageNumber > 0){
			pageNumber = pageNumber - 1;
		}
		try{
			List<Documentation> list = documentationService.findAll();
			resultMap.put("flag", true);
			resultMap.put("total", list.size());
			resultMap.put("rows", list);
		}catch(Exception ex){
			resultMap.put("flag", false);
			resultMap.put("message", "获取数据失败");
			ex.printStackTrace();
		}		
		return resultMap;
	}
	
	/**
	 * 删除文档列表
	 * @param queryParam
	 * @return
	 */
	@RequestMapping("/deleteDocument")
	@ResponseBody
	public Map<String, Object> deleteDocument(String id){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try{
			documentationService.deleteDocument(id);
			resultMap.put("flag", true);
		}catch(Exception ex){
			resultMap.put("flag", false);
			resultMap.put("message", "删除数据失败");
		}
		return resultMap;
	}
	
	
	/**
	 * 按照说明文档的name查找说明文档
	 * @param queryParam
	 * @return
	 */
	@RequestMapping("/showDocument")
	@ResponseBody
	public Map<String, Object> showDocument(String product,String page){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			Documentation document = documentationService.findDocByProductAndPage(product,page);
			resultMap.put("flag", true);
			resultMap.put("rows", document);
		}catch(Exception e){
			resultMap.put("flag", false);
			resultMap.put("message", "保存失败");
		}
		return resultMap;
	}
	
	
	/**
	 * 根据id查找说明文档
	 * @param queryParam
	 * @return
	 */
	@RequestMapping("/findDocument")
	@ResponseBody
	public Map<String, Object> findDocument(String id){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			Documentation document = documentationService.findDocById(id);
			resultMap.put("flag", true);
			resultMap.put("rows", document);
		}catch(Exception e){
			resultMap.put("flag", false);
			resultMap.put("message", "保存失败");
		}
		return resultMap;
	}
}
