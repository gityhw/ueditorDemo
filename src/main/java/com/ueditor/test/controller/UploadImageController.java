package com.ueditor.test.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ueditor.test.util.LoadPropertiesDataUtils;
import com.ueditor.test.util.RandomUtils;
import com.ueditor.test.util.StringUtils;

/**
 * 单张图片上传存储并返回回显地址
 * @author Administrator
 *
 */
@Controller
@RequestMapping(value="/resource/upload")
public class UploadImageController {
	
	@RequestMapping("/toDoc")
	public String toDoc(HttpServletRequest request,Model model){
		return "base/documentation";
	}
	
	/**
	 * 上传图片
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/images")
	public Map<String, Object> images (MultipartFile upfile, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> params = new HashMap<String, Object>();
		//String url = request.getSession().getAttribute("customUrl").toString();  ///ssmWebapp/ueditor/upload/
		try{
			 // 项目发布到服务器后图片所在地址
			 String url = LoadPropertiesDataUtils.getValue("ue.uploading.url");
			 if(url == null || "".equals(url)){
				 url = "/ueditor/upload"; //与properties文件中ue.uploading.url相同，未读取到文件数据时为url赋默认值
			 }
			 
			 // 获取名称后缀
			 String ext = StringUtils.getExt(upfile.getOriginalFilename());
			 String fileName = String.valueOf(System.currentTimeMillis()).concat("_").concat(RandomUtils.getRandom(6)).concat(".").concat(ext);
			 
			 //设置图片生成在服务器位置
			 String contextRealPath = request.getSession().getServletContext().getRealPath("").replace("\\", "/");
			 //String basePath = contextRealPath.concat(url); // "D:/tomcat/webapps/ssmWebapp" + "/ueditor/upload"
			 String basePath = "D:/upload".concat(url); // "D:/tomcat/webapps/ssmWebapp" + "/ueditor/upload"
			 String filePath = basePath.concat("/").concat(fileName);
			 
			 //生成文件到指定路径
			 File f = new File(filePath);
			 if(!f.exists()){
				 f.getParentFile().mkdirs();
			 }
			 /*OutputStream out = new FileOutputStream(f);
			 FileCopyUtils.copy(upfile.getInputStream(), out);*/
			 upfile.transferTo(f);
			 
			 /*String bakFilePath = "D:/upload/"+fileName;
			 File bakFile = new File(bakFilePath);
			 copyFile(f, bakFile);*/
			 
			 //设置图片返回的访问路径
			 //注意：config.json中 imageUrlPrefix属性+下面要返回的url构成完整的图片回显路径
			 String contextPath = request.getContextPath(); // /ueImgUpload
			 //String visitUrl = contextPath.concat(url).concat("/").concat(fileName);
			 String visitUrl = url.concat("/").concat(fileName);
			 params.put("state", "SUCCESS");
			 params.put("url", visitUrl); //如：/ssmWebapp/ueditor/upload/1557215333494_768286.png
			 params.put("size", upfile.getSize());
			 params.put("original", fileName);
			 params.put("type", upfile.getContentType());
		} catch (Exception e){
			 params.put("state", "ERROR");
		}
		 return params;
	}
	
	
	/**
	 * 复制文件的方法
	 * 
	 * @param fromFile
	 * @param toFile
	 * @throws Exception
	 */
	private static void copyFile(File fromFile, File toFile) throws Exception {
		FileInputStream is = new FileInputStream(fromFile);
		FileOutputStream os = new FileOutputStream(toFile);
		byte[] b = new byte[1024];
		int temp = 0;
		while ((temp = is.read(b)) != -1) {
			os.write(b, 0, temp);
		}
		is.close();
		os.close();
	}

}
